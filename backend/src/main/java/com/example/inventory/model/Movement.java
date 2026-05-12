package com.example.inventory.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Value;
import lombok.extern.jackson.Jacksonized;

import java.time.OffsetDateTime;

/**
 * Immutable DTO for inventory movement records.
 */
@Value
@Builder
@Jacksonized
public class Movement {
    String id;
    OffsetDateTime timestamp;
    String sku;
    
    @JsonProperty("movementType")
    String type; // Expected: "IN" or "OUT"
    
    Integer quantity;
}
