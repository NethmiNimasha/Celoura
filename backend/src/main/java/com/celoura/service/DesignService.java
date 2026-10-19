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

    public Optional<Design> updateDesign(String id, Design updated) {
        return designRepository.findById(id).map(existing -> {
            if (updated.getTitle() != null && !updated.getTitle().isBlank()) {
                existing.setTitle(updated.getTitle());
            }
            if (updated.getCategory() != null && !updated.getCategory().isBlank()) {
                existing.setCategory(updated.getCategory());
            }
            if (updated.getPrice() != null) {
                existing.setPrice(updated.getPrice());
                existing.setPriceFormatted("LKR " + String.format("%,d", updated.getPrice().longValue()));
            }
            if (updated.getPriceFormatted() != null && !updated.getPriceFormatted().isBlank()) {
                existing.setPriceFormatted(updated.getPriceFormatted());
            }
            if (updated.getImage() != null && !updated.getImage().isBlank()) {
                existing.setImage(updated.getImage());
            }
            if (updated.getFabric() != null) {
                existing.setFabric(updated.getFabric());
            }
            if (updated.getColor() != null) {
                existing.setColor(updated.getColor());
            }
            if (updated.getEmbroidery() != null) {
                existing.setEmbroidery(updated.getEmbroidery());
            }
            if (updated.getSilhouette() != null) {
                existing.setSilhouette(updated.getSilhouette());
            }
            if (updated.getDescription() != null) {
                existing.setDescription(updated.getDescription());
            }
            if (updated.getFeatured() != null) {
                existing.setFeatured(updated.getFeatured());
            }
            if (updated.getCustomizable() != null) {
                existing.setCustomizable(updated.getCustomizable());
            }
            return designRepository.save(existing);
        });
    }

    public void deleteDesign(String id) {
        designRepository.deleteById(id);
    }
}

