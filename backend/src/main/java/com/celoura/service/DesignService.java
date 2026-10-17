package com.celoura.service;

import com.celoura.model.Design;
import com.celoura.repository.DesignRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DesignService {

    private final DesignRepository designRepository;

    public DesignService(DesignRepository designRepository) {
        this.designRepository = designRepository;
    }

    public List<Design> getAllDesigns() {
        return designRepository.findAll();
    }

    public Optional<Design> getDesignById(String id) {
        return designRepository.findById(id);
    }

    public List<Design> getDesignsByCategory(String category) {
        if ("all".equalsIgnoreCase(category)) {
            return designRepository.findAll();
        }
        return designRepository.findByCategoryIgnoreCase(category);
    }

    public List<Design> getFeaturedDesigns() {
        return designRepository.findByFeaturedTrue();
    }

    public Design saveDesign(Design design) {
        return designRepository.save(design);
    }

    public void deleteDesign(String id) {
        designRepository.deleteById(id);
    }
}
