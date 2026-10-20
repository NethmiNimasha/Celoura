package com.celoura.controller;

import com.celoura.dto.RecommendationRequest;
import com.celoura.dto.RecommendationResponse;
import com.celoura.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @PostMapping
    public ResponseEntity<RecommendationResponse> getRecommendations(@RequestBody RecommendationRequest request) {
        RecommendationResponse response = recommendationService.generateRecommendations(request);
        return ResponseEntity.ok(response);
    }
}
