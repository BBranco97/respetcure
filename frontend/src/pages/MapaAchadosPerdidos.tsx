import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import {
    listarPontosAchadosPerdidos,
    type LostFoundMapPoint,
} from "@/lib/anuncios-service"

const iconePerdido = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

const iconeAchado = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})


export default function MapaAchadosPerdidos() {
    const [pontos, setPontos] = useState<LostFoundMapPoint[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const carregar = async () => {
            try {
                const pontosMapa = await listarPontosAchadosPerdidos()
                setPontos(pontosMapa)
            } catch {
                setError("Nao foi possivel carregar os pontos do mapa.")
            } finally {
                setLoading(false)
            }
        }

        void carregar()
    }, [])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Carregando mapa...
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto max-w-3xl rounded-md border border-red-800 bg-red-100 p-4 text-red-800">
                {error}
            </div>
        )
    }

    return (
        <div className="mx-auto h-[700px] w-full max-w-7xl overflow-hidden rounded-md border-2 border-gray-900">
            <MapContainer
                center={[-23.5505, -46.6333]}
                zoom={7}
                style={{
                    width: "100%",
                    height: "700px",
                }}
            >
                <AjustarMapa pontos={pontos} />

                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {pontos.map((ponto) => (
                    <Marker
                        key={ponto.id}
                        position={[
                            ponto.latitude,
                            ponto.longitude,
                        ]}
                        icon={
                            ponto.tipo === "perdido"
                                ? iconePerdido
                                : iconeAchado
                        }
                    >
                        <Popup>
                            <div>
                                <strong>{ponto.nomePet}</strong>
                                <br />
                                Tipo: {ponto.tipo}
                                <br />
                                <Link to={`/app/lostfound/${ponto.id}`}>
                                    Ver anuncio
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )

    function AjustarMapa({
                             pontos,
                         }: {
        pontos: LostFoundMapPoint[]
    }) {
        const map = useMap()

        useEffect(() => {
            if (pontos.length === 0) return

            const bounds = L.latLngBounds(
                pontos.map((p) => [
                    p.latitude,
                    p.longitude,
                ])
            )

            map.fitBounds(bounds, {
                padding: [50, 50],
            })
        }, [map, pontos])

        return null
    }
}
