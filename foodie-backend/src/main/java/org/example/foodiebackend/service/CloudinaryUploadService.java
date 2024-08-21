package org.example.foodiebackend.service;

import com.cloudinary.Cloudinary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryUploadService {

    @Autowired
    Cloudinary cloudinary;

    public Map upload(MultipartFile file) {
        try {
            Map data = this.cloudinary.uploader().upload(file.getBytes(), Map.of());
            return data;
        } catch (IOException e) {
            throw new RuntimeException("Image uploading error !!");
        }
    }

    public Map deleteImg(String public_id) throws IOException {
        try {
            Map data = this.cloudinary.uploader().destroy(public_id, Map.of());
            return data;
        } catch (IOException e) {
            throw new RuntimeException("Image deleting error !!");
        }
    }
}
