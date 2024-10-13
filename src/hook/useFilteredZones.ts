import { useMemo } from "react";
import moment from "moment";
import { Zone } from "../types";

const useFilteredZones = (
  zones: Zone[],
  dateRange: { startDate: moment.Moment | null; endDate: moment.Moment | null }
) => {
  return useMemo(() => {
    if (dateRange.startDate && dateRange.endDate) {
      return zones.filter((zone) => {
        const zoneDate = moment(zone.date).startOf("day");
        const startDate = dateRange.startDate?.startOf("day");
        const endDate = dateRange.endDate?.startOf("day");

        if (startDate && endDate) {
          return (
            zoneDate.isSameOrAfter(startDate) &&
            zoneDate.isSameOrBefore(endDate)
          );
        }
        return true; // Include all zones if dates are not properly set
      });
    }
    return zones;
  }, [zones, dateRange]);
};

export default useFilteredZones;