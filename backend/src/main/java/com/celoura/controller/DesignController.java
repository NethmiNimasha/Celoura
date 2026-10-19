package com.celoura.controller;

import com.celoura.model.Design;
import com.celoura.service.DesignService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/designs")
public class DesignController {

    private final DesignService designService;

    public DesignController(DesignService designService) {
        this.designService = designService;
    }

    @GetMapping
    public List<Design> getAllDesigns() {
        return designService.getAllDesigns();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Design> getDesignById(@PathVariable String id) {
        return designService.getDesignById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{category}")
    public List<Design> getDesignsByCategory(@PathVariable String category) {
        return designService.getDesignsByCategory(category);
    }

    @GetMapping("/featured")
    public List<Design> getFeaturedDesigns() {
        return designService.getFeaturedDesigns();
    }

    @PostMapping
    public ResponseEntity<Design> createDesign(@RequestBody Design design) {
        return ResponseEntity.ok(designService.saveDesign(design));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Design> updateDesign(@PathVariable String id, @RequestBody Design updated) {
        return designService.updateDesign(id, updated)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDesign(@PathVariable String id) {
        designService.deleteDesign(id);
        return ResponseEntity.noContent().build();
    }
}

