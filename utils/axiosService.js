import http from "./http";

class axiosService {
    getCalendar(data) {
        return http.post(`/GetCalendarData`,data);
      }
}

export default new axiosService();