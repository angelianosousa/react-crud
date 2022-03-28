import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("document_json", file);

    return http.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer bf664015872f91c5982765bb412c1501"
      },
      onUploadProgress,
    });
  }
}

export default new UploadFilesService();
