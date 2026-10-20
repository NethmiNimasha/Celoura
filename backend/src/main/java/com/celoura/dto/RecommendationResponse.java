package com.celoura.dto;

import com.celoura.model.Design;
import java.util.List;

public class RecommendationResponse {

    private ScoredDesign topPick;
    private List<ScoredDesign> curatedRecommendations;
    private String stylistVerdict;
    private String bodySilhouetteTip;
    private String jewelryPairing;

    public static class ScoredDesign {
        private Design design;
        private int matchScore;
        private String whyItMatches;
        private String recommendedNeckline;
        private String recommendedSleeve;

        public ScoredDesign() {}

        public ScoredDesign(Design design, int matchScore, String whyItMatches, 
                            String recommendedNeckline, String recommendedSleeve) {
            this.design = design;
            this.matchScore = matchScore;
            this.whyItMatches = whyItMatches;
            this.recommendedNeckline = recommendedNeckline;
            this.recommendedSleeve = recommendedSleeve;
        }

        public Design getDesign() { return design; }
        public void setDesign(Design design) { this.design = design; }

        public int getMatchScore() { return matchScore; }
        public void setMatchScore(int matchScore) { this.matchScore = matchScore; }

        public String getWhyItMatches() { return whyItMatches; }
        public void setWhyItMatches(String whyItMatches) { this.whyItMatches = whyItMatches; }

        public String getRecommendedNeckline() { return recommendedNeckline; }
        public void setRecommendedNeckline(String recommendedNeckline) { this.recommendedNeckline = recommendedNeckline; }

        public String getRecommendedSleeve() { return recommendedSleeve; }
        public void setRecommendedSleeve(String recommendedSleeve) { this.recommendedSleeve = recommendedSleeve; }
    }

    public RecommendationResponse() {}

    public RecommendationResponse(ScoredDesign topPick, List<ScoredDesign> curatedRecommendations, 
                                  String stylistVerdict, String bodySilhouetteTip, String jewelryPairing) {
        this.topPick = topPick;
        this.curatedRecommendations = curatedRecommendations;
        this.stylistVerdict = stylistVerdict;
        this.bodySilhouetteTip = bodySilhouetteTip;
        this.jewelryPairing = jewelryPairing;
    }

    public ScoredDesign getTopPick() { return topPick; }
    public void setTopPick(ScoredDesign topPick) { this.topPick = topPick; }

    public List<ScoredDesign> getCuratedRecommendations() { return curatedRecommendations; }
    public void setCuratedRecommendations(List<ScoredDesign> curatedRecommendations) { this.curatedRecommendations = curatedRecommendations; }

    public String getStylistVerdict() { return stylistVerdict; }
    public void setStylistVerdict(String stylistVerdict) { this.stylistVerdict = stylistVerdict; }

    public String getBodySilhouetteTip() { return bodySilhouetteTip; }
    public void setBodySilhouetteTip(String bodySilhouetteTip) { this.bodySilhouetteTip = bodySilhouetteTip; }

    public String getJewelryPairing() { return jewelryPairing; }
    public void setJewelryPairing(String jewelryPairing) { this.jewelryPairing = jewelryPairing; }
}
