package com.example.inventory.service;

import com.example.inventory.model.Movement;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovementService {

    @Value("${mock.data.path}")
    private Resource dataResource;

    private List<Movement> movementCache = new ArrayList<>();
    private final ObjectMapper mapper = new ObjectMapper().registerModule(new JavaTimeModule());

    @PostConstruct
    public void loadInitialData() {
        log.info("Loading inventory movements from: {}", dataResource.getDescription());
        try {
            if (dataResource.exists()) {
                this.movementCache = mapper.readValue(
                    dataResource.getInputStream(), 
                    new TypeReference<List<Movement>>() {}
                );
                log.info("Successfully indexed {} movement records.", movementCache.size());
            }
        } catch (IOException e) {
            log.error("Critical failure loading mock data: {}", e.getMessage(), e);
            this.movementCache = Collections.emptyList();
        }
    }

    public List<String> getUniqueSkus() {
        return movementCache.stream()
                .map(Movement::getSku)
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    public List<Movement> queryMovements(OffsetDateTime start, OffsetDateTime end, String type, String sku) {
        String skuCriteria = (sku != null && !sku.equalsIgnoreCase("ALL")) ? sku.trim() : null;

        return movementCache.stream()
                .filter(m -> start == null || !m.getTimestamp().isBefore(start))
                .filter(m -> end == null || !m.getTimestamp().isAfter(end))
                .filter(m -> type == null || type.equalsIgnoreCase("ALL") || m.getType().equalsIgnoreCase(type))
                .filter(m -> skuCriteria == null || (m.getSku() != null && m.getSku().equalsIgnoreCase(skuCriteria)))
                .collect(Collectors.toList());
    }

    public byte[] generateExportCsv(List<Movement> data) {
        StringBuilder sb = new StringBuilder("ID,Timestamp,SKU,Type,Quantity\n");
        data.forEach(m -> sb.append(String.format("%s,%s,%s,%s,%d\n", 
                m.getId(), m.getTimestamp(), m.getSku(), m.getType(), m.getQuantity())));
        return sb.toString().getBytes();
    }
}
