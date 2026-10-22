package com.celoura.repository;

import com.celoura.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    
    List<Review> findAllByOrderByCreatedAtDesc();

    List<Review> findByDesignIdOrderByCreatedAtDesc(String designId);

    List<Review> findByGarmentCategoryOrderByCreatedAtDesc(String garmentCategory);

    @Query("SELECT COALESCE(AVG(r.rating), 5.0) FROM Review r")
    Double getOverallAverageRating();

    @Query("SELECT COALESCE(AVG(r.rating), 5.0) FROM Review r WHERE r.designId = :designId")
    Double getAverageRatingForDesign(String designId);

    Long countByDesignId(String designId);
}
