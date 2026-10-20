package com.celoura.service;

import com.celoura.dto.RecommendationRequest;
import com.celoura.dto.RecommendationResponse;
import com.celoura.model.Design;
import com.celoura.repository.DesignRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final DesignRepository designRepository;

    public RecommendationService(DesignRepository designRepository) {
        this.designRepository = designRepository;
    }

    public RecommendationResponse generateRecommendations(RecommendationRequest request) {
        List<Design> designs = designRepository.findAll();
        if (designs.isEmpty()) {
            return new RecommendationResponse(null, Collections.emptyList(), 
                "No designs found in catalogue.", "", "");
        }

        String targetCategory = request.getCategory() != null ? request.getCategory().trim() : "All";
        String occasion = request.getOccasion() != null ? request.getOccasion().toLowerCase() : "bridal-wedding";
        String bodyShape = request.getBodyShape() != null ? request.getBodyShape().toLowerCase() : "hourglass";
        String undertone = request.getUndertone() != null ? request.getUndertone().toLowerCase() : "warm";

        List<RecommendationResponse.ScoredDesign> scoredList = designs.stream().map(d -> {
            int score = 50;

            // Category matching
            if (!"all".equalsIgnoreCase(targetCategory) && !"".equalsIgnoreCase(targetCategory)) {
                if (d.getCategory() != null && d.getCategory().equalsIgnoreCase(targetCategory)) {
                    score += 25;
                } else {
                    score -= 10;
                }
            } else {
                score += 15;
            }

            // Occasion check
            String allText = (d.getTitle() + " " + d.getCategory() + " " + d.getFabric() + " " + 
                              d.getColor() + " " + d.getEmbroidery() + " " + d.getDescription() + " " +
                              d.getSilhouette()).toLowerCase();

            if (occasion.contains("bridal") && (allText.contains("bridal") || allText.contains("zardozi") || allText.contains("velvet"))) {
                score += 15;
            } else if (occasion.contains("reception") && (allText.contains("gown") || allText.contains("frock") || allText.contains("crystals"))) {
                score += 15;
            } else if (occasion.contains("sangeet") && (allText.contains("organza") || allText.contains("skirt") || allText.contains("flare"))) {
                score += 15;
            }

            // Undertone check
            if (undertone.contains("warm") && (allText.contains("gold") || allText.contains("emerald") || allText.contains("velvet"))) {
                score += 10;
            } else if (undertone.contains("cool") && (allText.contains("black") || allText.contains("peacock") || allText.contains("burgundy"))) {
                score += 10;
            }

            if (Boolean.TRUE.equals(d.getFeatured())) {
                score += 5;
            }

            int finalScore = Math.min(99, Math.max(76, score));

            String whyItMatches = String.format("Curated for %s with %s frame. The %s fabric and %s tone complement venue aesthetics.",
                    request.getOccasion(), request.getBodyShape(), d.getFabric(), d.getColor());

            String neckline = bodyShape.contains("pear") ? "Boat Neck" : "Sweetheart Corset Plunge";
            String sleeve = bodyShape.contains("apple") ? "Full Fitted Sleeve with Zari Cuff" : "Elbow Length Embroidered";

            return new RecommendationResponse.ScoredDesign(d, finalScore, whyItMatches, neckline, sleeve);
        })
        .sorted((a, b) -> Integer.compare(b.getMatchScore(), a.getMatchScore()))
        .collect(Collectors.toList());

        RecommendationResponse.ScoredDesign topPick = scoredList.isEmpty() ? null : scoredList.get(0);
        List<RecommendationResponse.ScoredDesign> curated = scoredList.size() > 1 
            ? scoredList.subList(1, Math.min(4, scoredList.size())) 
            : Collections.emptyList();

        String stylistVerdict = topPick != null 
            ? String.format("The %s is our premier recommendation (%d%% Match), selected for ideal proportion balancing.",
                topPick.getDesign().getTitle(), topPick.getMatchScore())
            : "No recommendation available.";

        String bodyTip = "Emphasize vertical lines and sculpted waistbands with built-in can-can volume.";
        String jewelry = undertone.contains("warm") ? "Antique 24K Gold and Polki Choker" : "Uncut Diamonds and Platinum Accents";

        return new RecommendationResponse(topPick, curated, stylistVerdict, bodyTip, jewelry);
    }
}
