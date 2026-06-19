package br.com.respetcure.util;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;

public final class GeoUtils {

    private static final GeometryFactory GEOMETRY_FACTORY =
            new GeometryFactory(
                    new PrecisionModel(),
                    4326
            );

    private GeoUtils() {
    }

    public static Point criarPonto(
            Double longitude,
            Double latitude
    ) {

        Point point =
                GEOMETRY_FACTORY.createPoint(
                        new Coordinate(
                                longitude,
                                latitude
                        )
                );

        point.setSRID(
                4326
        );

        return point;
    }
}