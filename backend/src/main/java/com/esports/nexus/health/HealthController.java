package com.esports.nexus.health;

import com.esports.nexus.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/health")
public class HealthController {

    private final DataSource dataSource;

    public HealthController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Map<String, Object>>> getHealthStatus() {
        Map<String, Object> details = new HashMap<>();
        details.put("status", "UP");
        details.put("platform", "eSports Nexus");
        details.put("version", "1.0.0");
        details.put("timestamp", Instant.now().toString());

        boolean dbConnected = false;
        try (Connection conn = dataSource.getConnection()) {
            dbConnected = conn.isValid(2);
        } catch (Exception ignored) {
            dbConnected = false;
        }

        details.put("databaseStatus", dbConnected ? "CONNECTED" : "UNAVAILABLE");

        return ResponseEntity.ok(ApiResponse.ok("eSports Nexus API is operational", details));
    }
}
