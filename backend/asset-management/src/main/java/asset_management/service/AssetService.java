package asset_management.service;

import asset_management.entity.Asset;
import asset_management.entity.AssetStatus;
import asset_management.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class AssetService {

    private final AssetRepository assetRepository;

    @Autowired
    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> getAllAssets(AssetStatus status, String search) {
        if (status == null && (search == null || search.trim().isEmpty())) {
            return assetRepository.findAll();
        }
        String searchParam = (search != null && !search.trim().isEmpty()) ? search.trim() : null;
        return assetRepository.searchAssets(status, searchParam);
    }

    public Optional<Asset> getAssetById(Long id) {
        return assetRepository.findById(id);
    }

    public Asset createAsset(Asset asset) {
        // Validate unique assetTag
        if (assetRepository.findByAssetTag(asset.getAssetTag()).isPresent()) {
            throw new IllegalArgumentException("Asset tag '" + asset.getAssetTag() + "' is already in use.");
        }
        // Validate unique serialNumber
        if (assetRepository.findBySerialNumber(asset.getSerialNumber()).isPresent()) {
            throw new IllegalArgumentException("Serial number '" + asset.getSerialNumber() + "' is already in use.");
        }
        
        // Force uppercase for asset tag to look professional
        asset.setAssetTag(asset.getAssetTag().toUpperCase());
        return assetRepository.save(asset);
    }

    public Asset updateAsset(Long id, Asset assetDetails) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with id: " + id));

        // Validate unique assetTag if it changed
        if (!asset.getAssetTag().equalsIgnoreCase(assetDetails.getAssetTag())) {
            if (assetRepository.findByAssetTag(assetDetails.getAssetTag()).isPresent()) {
                throw new IllegalArgumentException("Asset tag '" + assetDetails.getAssetTag() + "' is already in use.");
            }
        }

        // Validate unique serialNumber if it changed
        if (!asset.getSerialNumber().equals(assetDetails.getSerialNumber())) {
            if (assetRepository.findBySerialNumber(assetDetails.getSerialNumber()).isPresent()) {
                throw new IllegalArgumentException("Serial number '" + assetDetails.getSerialNumber() + "' is already in use.");
            }
        }

        asset.setAssetTag(assetDetails.getAssetTag().toUpperCase());
        asset.setAssetName(assetDetails.getAssetName());
        asset.setCategory(assetDetails.getCategory());
        asset.setBrand(assetDetails.getBrand());
        asset.setModel(assetDetails.getModel());
        asset.setSerialNumber(assetDetails.getSerialNumber());
        asset.setStatus(assetDetails.getStatus());
        asset.setPurchaseDate(assetDetails.getPurchaseDate());
        
        // If status is not ASSIGNED, clear assignedTo and department
        if (assetDetails.getStatus() != AssetStatus.ASSIGNED) {
            asset.setAssignedTo(null);
            asset.setDepartment(null);
        } else {
            asset.setAssignedTo(assetDetails.getAssignedTo());
            asset.setDepartment(assetDetails.getDepartment());
        }

        return assetRepository.save(asset);
    }

    public void deleteAsset(Long id) {
        Asset asset = assetRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Asset not found with id: " + id));
        assetRepository.delete(asset);
    }
}
