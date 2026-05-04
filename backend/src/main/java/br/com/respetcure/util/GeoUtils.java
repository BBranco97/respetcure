package br.com.respetcure.util;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

public final class GeoUtils {

    private static final GeometryFactory GEOMETRY_FACTORY =
            new GeometryFactory();

    private GeoUtils() {
    }

    public static Point criarPonto(
            Double longitude,
            Double latitude
    ) {

        return GEOMETRY_FACTORY.createPoint(
                new Coordinate(
                        longitude,
                        latitude
                )
        );
    }
}