package asset_management.service;

import asset_management.entity.ServiceRequest;
import asset_management.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository repository;

    public ServiceRequestService(ServiceRequestRepository repository) {
        this.repository = repository;
    }

    public List<ServiceRequest> getAllRequests() {
        return repository.findAll();
    }

    public ServiceRequest createRequest(ServiceRequest request) {
        return repository.save(request);
    }

    public ServiceRequest updateStatus(Long id, String status) {

        ServiceRequest request = repository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Service request not found with id: " + id
                        )
                );

        request.setStatus(status);

        return repository.save(request);
    }
}