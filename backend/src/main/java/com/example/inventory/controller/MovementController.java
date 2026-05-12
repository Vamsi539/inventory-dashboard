package com.example.inventory.controller;

import com.example.inventory.model.Movement;
import com.example.inventory.service.MovementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.OffsetDateTime;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/inventory/movements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class MovementController {

    private final MovementService movementService;

    @GetMapping("/skus")
    public ResponseEntity<List<String>> getAvailableSkus() {
        return ResponseEntity.ok(movementService.getUniqueSkus());
    }

    @GetMapping
    public ResponseEntity<?> searchMovements(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime start,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) OffsetDateTime end,
            @RequestParam(defaultValue = "ALL") String type,
            @RequestParam(defaultValue = "ALL") String sku,
            @RequestParam(defaultValue = "false") boolean export) {

        log.debug("GET /movements?start={}&end={}&type={}&sku={}&export={}", start, end, type, sku, export);

        List<Movement> results = movementService.queryMovements(start, end, type, sku);

        if (export) {
            byte[] csvData = movementService.generateExportCsv(results);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment()
                            .filename("inventory_export.csv").build().toString())
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .body(csvData);
        }

        return ResponseEntity.ok(results);
    }
}
