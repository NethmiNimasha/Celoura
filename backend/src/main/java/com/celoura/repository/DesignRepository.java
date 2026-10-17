package com.celoura.repository;

import com.celoura.model.Design;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DesignRepository extends JpaRepository<Design, String> {
    List<Design> findByCategoryIgnoreCase(String category);
    List<Design> findByFeaturedTrue();
}
