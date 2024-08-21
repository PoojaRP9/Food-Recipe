package org.example.foodiebackend.config;

import com.cloudinary.Cloudinary;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfiguration {

    @Bean
    public Cloudinary getCloudinary() {
        Map map = new HashMap();
        map.put("cloud_name", "drsuzbfwz");
        map.put("api_key", "829367997933939");
        map.put("api_secret", "YigV80bki7hasE45RLDTKAJQyZ0");
        map.put("secure", true);
        return new Cloudinary(map);
    }
}
