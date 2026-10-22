package com.celoura.service;

import com.celoura.model.Review;
import com.celoura.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<Review> getReviewsByDesignId(String designId) {
        return reviewRepository.findByDesignIdOrderByCreatedAtDesc(designId);
    }

    public List<Review> getReviewsByCategory(String category) {
        return reviewRepository.findByGarmentCategoryOrderByCreatedAtDesc(category);
    }

    public Review createReview(Review review) {
        if (review.getRating() == null || review.getRating() < 1) {
            review.setRating(5);
        } else if (review.getRating() > 5) {
            review.setRating(5);
        }

        if (review.getCreatedAt() == null) {
            review.setCreatedAt(LocalDateTime.now());
        }

        if (review.getVerifiedPurchase() == null) {
            review.setVerifiedPurchase(true);
        }

        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }

    public Map<String, Object> getOverallStats() {
        List<Review> all = reviewRepository.findAll();
        Map<String, Object> stats = new HashMap<>();

        if (all.isEmpty()) {
            stats.put("averageRating", 5.0);
            stats.put("totalReviews", 0);
            stats.put("breakdown", Map.of("5", 0, "4", 0, "3", 0, "2", 0, "1", 0));
            stats.put("recommendationRate", "100%");
            return stats;
        }

        double sum = 0;
        int count5 = 0, count4 = 0, count3 = 0, count2 = 0, count1 = 0;

        for (Review r : all) {
            int rating = r.getRating() != null ? r.getRating() : 5;
            sum += rating;
            if (rating == 5) count5++;
            else if (rating == 4) count4++;
            else if (rating == 3) count3++;
            else if (rating == 2) count2++;
            else count1++;
        }

        double avg = sum / all.size();
        stats.put("averageRating", Math.round(avg * 10.0) / 10.0);
        stats.put("totalReviews", all.size());
        stats.put("breakdown", Map.of(
            "5", count5,
            "4", count4,
            "3", count3,
            "2", count2,
            "1", count1
        ));
        
        long satisfied = count5 + count4;
        int rate = (int) Math.round(((double) satisfied / all.size()) * 100);
        stats.put("recommendationRate", rate + "%");

        return stats;
    }
}
