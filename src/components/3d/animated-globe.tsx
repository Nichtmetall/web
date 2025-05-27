"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, Points, PointMaterial, Line } from "@react-three/drei"
import * as THREE from "three"

// GeoJSON Feature interface
interface GeoJSONFeature {
    type: "Feature"
    properties: {
        admin: string
        name: string
        continent: string
    }
    geometry: {
        type: "Polygon" | "MultiPolygon"
        coordinates: number[][][] | number[][][][]
    }
}

interface GlobeData {
    type: "FeatureCollection"
    features: GeoJSONFeature[]
}

// Convert latitude/longitude to 3D sphere coordinates
function latLonToSphere(lat: number, lon: number, radius: number = 1.015) {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lon + 180) * (Math.PI / 180)

    return [
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    ]
}

// Generate realistic country outlines from GeoJSON data
function generateCountryOutlinePoints(geoData: GlobeData) {
    const points: number[] = []

    geoData.features.forEach(feature => {
        if (feature.geometry.type === "Polygon") {
            // Handle single polygon
            const coordinates = feature.geometry.coordinates as number[][][]
            processCoordinateRing(coordinates[0], points)
        } else if (feature.geometry.type === "MultiPolygon") {
            // Handle multiple polygons
            const multiPolygonCoords = feature.geometry.coordinates as number[][][][]
            multiPolygonCoords.forEach(polygon => {
                processCoordinateRing(polygon[0], points)
            })
        }
    })

    console.log(`Total country outline points: ${points.length / 3}`)
    return new Float32Array(points)
}

// Process a coordinate ring and add interpolated points
function processCoordinateRing(coordinates: number[][], points: number[]) {
    for (let i = 0; i < coordinates.length; i++) {
        const [lon, lat] = coordinates[i]
        if (typeof lat === 'number' && typeof lon === 'number' && !isNaN(lat) && !isNaN(lon)) {
            // Add the original point
            const [x, y, z] = latLonToSphere(lat, lon, 1.01)
            points.push(x, y, z)

            // Add interpolated points between this and next point for smoother curves
            const nextIndex = (i + 1) % coordinates.length
            const [nextLon, nextLat] = coordinates[nextIndex]

            if (typeof nextLat === 'number' && typeof nextLon === 'number' && !isNaN(nextLat) && !isNaN(nextLon)) {
                // Add 2 interpolated points between each coordinate pair
                for (let step = 1; step <= 2; step++) {
                    const t = step / 3
                    const interpLat = lat + (nextLat - lat) * t
                    const interpLon = lon + (nextLon - lon) * t
                    const [ix, iy, iz] = latLonToSphere(interpLat, interpLon, 1.01)
                    points.push(ix, iy, iz)
                }
            }
        }
    }
}

// Major cities (lat, lon)
const cities = [
    // North America
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "Chicago", lat: 41.8781, lon: -87.6298 },
    { name: "Toronto", lat: 43.6532, lon: -79.3832 },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
    { name: "Vancouver", lat: 49.2827, lon: -123.1207 },
    { name: "San Francisco", lat: 37.7749, lon: -122.4194 },
    { name: "Miami", lat: 25.7617, lon: -80.1918 },
    { name: "Seattle", lat: 47.6062, lon: -122.3321 },

    // Europe
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Berlin", lat: 52.5200, lon: 13.4050 },
    { name: "Moscow", lat: 55.7558, lon: 37.6176 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Amsterdam", lat: 52.3676, lon: 4.9041 },
    { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
    { name: "Zurich", lat: 47.3769, lon: 8.5417 },
    { name: "Vienna", lat: 48.2082, lon: 16.3738 },

    // Asia
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
    { name: "Shanghai", lat: 31.2304, lon: 121.4737 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "Singapore", lat: 1.3521, lon: 103.8198 },
    { name: "Hong Kong", lat: 22.3193, lon: 114.1694 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 },
    { name: "Dubai", lat: 25.2048, lon: 55.2708 },
    { name: "Tel Aviv", lat: 32.0853, lon: 34.7818 },
    { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
    { name: "Manila", lat: 14.5995, lon: 120.9842 },

    // Africa
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Lagos", lat: 6.5244, lon: 3.3792 },
    { name: "Cape Town", lat: -33.9249, lon: 18.4241 },
    { name: "Nairobi", lat: -1.2921, lon: 36.8219 },
    { name: "Johannesburg", lat: -26.2041, lon: 28.0473 },
    { name: "Casablanca", lat: 33.5731, lon: -7.5898 },
    { name: "Addis Ababa", lat: 9.1450, lon: 40.4897 },

    // South America
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Buenos Aires", lat: -34.6118, lon: -58.3960 },
    { name: "Lima", lat: -12.0464, lon: -77.0428 },
    { name: "Bogotá", lat: 4.7110, lon: -74.0721 },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729 },
    { name: "Santiago", lat: -33.4489, lon: -70.6693 },
    { name: "Caracas", lat: 10.4806, lon: -66.9036 },

    // Australia/Oceania
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Melbourne", lat: -37.8136, lon: 144.9631 },
    { name: "Auckland", lat: -36.8485, lon: 174.7633 },
    { name: "Perth", lat: -31.9505, lon: 115.8605 }
]



// Generate continent fill points from GeoJSON data
function generateGeoJSONFillPoints(geoData: GlobeData) {
    const points: number[] = []

    geoData.features.forEach(feature => {
        const continent = feature.properties.continent
        const density = getContinentDensity(continent)

        if (feature.geometry.type === "Polygon") {
            const polygonCoords = feature.geometry.coordinates as number[][][]
            generatePolygonFillPoints(polygonCoords[0], points, density)
        } else if (feature.geometry.type === "MultiPolygon") {
            const multiPolygonCoords = feature.geometry.coordinates as number[][][][]
            multiPolygonCoords.forEach(polygon => {
                generatePolygonFillPoints(polygon[0], points, density)
            })
        }
    })

    console.log(`Total GeoJSON fill points: ${points.length / 3}`)
    return new Float32Array(points)
}

// Generate fill points for a polygon using bounding box sampling
function generatePolygonFillPoints(coordinates: number[][], points: number[], density: number) {
    // Find bounding box
    let minLat = Infinity, maxLat = -Infinity
    let minLon = Infinity, maxLon = -Infinity

    coordinates.forEach(([lon, lat]) => {
        if (typeof lat === 'number' && typeof lon === 'number') {
            minLat = Math.min(minLat, lat)
            maxLat = Math.max(maxLat, lat)
            minLon = Math.min(minLon, lon)
            maxLon = Math.max(maxLon, lon)
        }
    })

    // Generate random points within bounding box
    const numPoints = Math.floor(50 * density)
    for (let i = 0; i < numPoints; i++) {
        const lat = minLat + Math.random() * (maxLat - minLat)
        const lon = minLon + Math.random() * (maxLon - minLon)

        // Simple point-in-polygon check (basic)
        if (isPointInPolygon(lat, lon, coordinates)) {
            const [x, y, z] = latLonToSphere(lat, lon, 1.005)
            points.push(x, y, z)
        }
    }
}

// Simple point-in-polygon test using ray casting
function isPointInPolygon(lat: number, lon: number, coordinates: number[][]): boolean {
    let inside = false
    for (let i = 0, j = coordinates.length - 1; i < coordinates.length; j = i++) {
        const [xi, yi] = coordinates[i]
        const [xj, yj] = coordinates[j]

        if (((yi > lat) !== (yj > lat)) && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
            inside = !inside
        }
    }
    return inside
}

// Get density multiplier for different continents
function getContinentDensity(continent: string): number {
    switch (continent.toLowerCase()) {
        case 'asia': return 4.0
        case 'africa': return 3.0
        case 'north america': return 2.5
        case 'south america': return 2.5
        case 'europe': return 2.0
        case 'oceania': return 1.5
        default: return 2.0
    }
}



// Generate city points
function generateCityPoints() {
    const points: number[] = []

    cities.forEach(city => {
        const [x, y, z] = latLonToSphere(city.lat, city.lon, 1.02) // Slightly elevated
        points.push(x, y, z)
    })

    return new Float32Array(points)
}



// Continent Outlines Component
function ContinentOutlines() {
    const pointsRef = useRef<THREE.Points>(null)
    const [geoData, setGeoData] = useState<GlobeData | null>(null)

    // Load GeoJSON data
    useEffect(() => {
        fetch('/globe.json')
            .then(response => response.json())
            .then((data: GlobeData) => {
                console.log("Loaded GeoJSON data:", data.features.length, "features")
                setGeoData(data)
            })
            .catch(error => console.error("Error loading globe data:", error))
    }, [])

    const continentPoints = useMemo(() => {
        if (!geoData) return new Float32Array()
        console.log("Generating country outline points...")
        return generateCountryOutlinePoints(geoData)
    }, [geoData])

    useFrame((state) => {
        if (pointsRef.current) {
            // More visible pulsing for continent outlines
            if (pointsRef.current.material instanceof THREE.PointsMaterial) {
                pointsRef.current.material.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 1.5) * 0.2
            }
        }
    })

    return (
        <Points ref={pointsRef} positions={continentPoints}>
            <PointMaterial
                size={0.015}
                transparent
                opacity={0.8}
                sizeAttenuation
                color="#ffffff"
            />
        </Points>
    )
}

// Continent Fill Component
function ContinentFill() {
    const pointsRef = useRef<THREE.Points>(null)
    const [geoData, setGeoData] = useState<GlobeData | null>(null)

    // Load GeoJSON data
    useEffect(() => {
        fetch('/globe.json')
            .then(response => response.json())
            .then((data: GlobeData) => {
                setGeoData(data)
            })
            .catch(error => console.error("Error loading globe data:", error))
    }, [])

    const fillPoints = useMemo(() => {
        if (!geoData) return new Float32Array()
        console.log("Generating continent fill points...")
        return generateGeoJSONFillPoints(geoData)
    }, [geoData])

    useFrame((state) => {
        if (pointsRef.current) {
            // Very subtle animation for fill points
            if (pointsRef.current.material instanceof THREE.PointsMaterial) {
                pointsRef.current.material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05
            }
        }
    })

    return (
        <Points ref={pointsRef} positions={fillPoints}>
            <PointMaterial
                size={0.005}
                transparent
                opacity={0.4}
                sizeAttenuation
                color="#ffffff"
            />
        </Points>
    )
}

// City Markers Component with Color Animation
function CityMarkers() {
    const pointsRef = useRef<THREE.Points>(null)
    const cityPoints = useMemo(() => generateCityPoints(), [])

    // Define colors for different continents/regions
    const cityColors = useMemo(() => {
        return cities.map((city, index) => {
            // Assign colors based on region or create a rainbow effect
            const hue = (index * 137.508) % 360 // Golden angle for even distribution
            return `hsl(${hue}, 70%, 60%)`
        })
    }, [])

    useFrame((state) => {
        if (pointsRef.current) {
            // Enhanced pulsing for cities with color cycling
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.5 + 0.5
            const intensity = 0.7 + pulse * 0.3

            if (pointsRef.current.material instanceof THREE.PointsMaterial) {
                pointsRef.current.material.opacity = intensity
                // Dynamic size pulsing
                pointsRef.current.material.size = 0.03 + pulse * 0.02

                // Color cycling effect
                const colorCycle = (state.clock.elapsedTime * 0.5) % 1
                const hue = colorCycle * 360
                pointsRef.current.material.color = new THREE.Color(`hsl(${hue}, 80%, 70%)`)
            }
        }
    })

    return (
        <Points ref={pointsRef} positions={cityPoints}>
            <PointMaterial
                size={0.03}
                transparent
                opacity={1.0}
                sizeAttenuation
                color="#ff6b6b"
            />
        </Points>
    )
}





// Globe Border/Wireframe Component
function GlobeBorder() {
    const sphereRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (sphereRef.current) {
            sphereRef.current.rotation.y = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <Sphere ref={sphereRef} args={[1.01, 64, 32]}>
            <meshBasicMaterial
                color="#ffffff"
                wireframe
                transparent
                opacity={0.025}
            />
        </Sphere>
    )
}

// Main Globe Component
export function AnimatedGlobe({ scale = 1 }: { scale?: number }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.03
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
        }
    })

    return (
        <group ref={groupRef} scale={scale}>
            {/* Globe Border */}
            <GlobeBorder />

            {/* Continent Fill */}
            <ContinentFill />

            {/* Continent Outlines */}
            <ContinentOutlines />

            {/* City Markers */}
            <CityMarkers />
        </group>
    )
} 