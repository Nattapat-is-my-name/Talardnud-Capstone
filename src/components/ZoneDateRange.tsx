import React from "react";
import { Text } from "@chakra-ui/react";
import { Zone } from "../types";
import moment from "moment";

interface ZoneDateRangeProps {
  zones: Zone[];
  currentZone: string;
}

const ZoneDateRange: React.FC<ZoneDateRangeProps> = ({
  zones,
  currentZone,
}) => {
  const getDateRange = (zones: Zone[], currentZone: string) => {
    const zoneDates = zones
      .filter((zone) => zone.zone === currentZone)
      .map((zone) => moment(zone.date).startOf("day"));
    const startDate = moment.min(zoneDates);
    const endDate = moment.max(zoneDates);
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange(zones, currentZone);

  if (startDate.isSame(endDate, "day")) {
    return (
      <Text fontSize="sm" color="gray.500">
        Date: {startDate.format("MMM D, YYYY")}
      </Text>
    );
  }

  return (
    <Text fontSize="sm" color="gray.500">
      Date Range: {startDate.format("MMM D, YYYY")} -{" "}
      {endDate.format("MMM D, YYYY")}
    </Text>
  );
};

export default ZoneDateRange;
