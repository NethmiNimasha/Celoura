package com.celoura.controller;

import com.celoura.model.Review;
import com.celoura.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/design/{designId}")
    public List<Review> getReviewsByDesign(@PathVariable String designId) {
        return reviewService.getReviewsByDesignId(designId);
    }

    @GetMapping("/category/{category}")
    public List<Review> getReviewsByCategory(@PathVariable String category) {
        return reviewService.getReviewsByCategory(category);
    }

    @GetMapping("/stats")
    public Map<String, Object> getReviewStats() {
        return reviewService.getOverallStats();
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return ResponseEntity.ok(reviewService.createReview(review));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}
