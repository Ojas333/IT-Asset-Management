package asset_management.controller;

import asset_management.entity.ServiceRequest;
import asset_management.service.ServiceRequestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class ServiceRequestController {

    private final ServiceRequestService service;

    public ServiceRequestController(ServiceRequestService service) {
        this.service = service;
    }

    @GetMapping
    public List<ServiceRequest> getAllRequests() {
        return service.getAllRequests();
    }

    @PostMapping
    public ServiceRequest createRequest(
            @RequestBody ServiceRequest request) {
        return service.createRequest(request);
    }

    @PutMapping("/{id}/status")
    public ServiceRequest updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {
        return service.updateStatus(id, status);
    }
}