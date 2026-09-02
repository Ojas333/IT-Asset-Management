package asset_management.repository;

import asset_management.entity.Asset;
import asset_management.entity.AssetStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    
    Optional<Asset> findByAssetTag(String assetTag);
    
    Optional<Asset> findBySerialNumber(String serialNumber);

    @Query("SELECT a FROM Asset a WHERE " +
           "(:status IS NULL OR a.status = :status) AND " +
           "(:search IS NULL OR LOWER(a.assetName) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.assetTag) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.category) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.brand) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.model) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.assignedTo) LIKE LOWER(CONCAT('%', :search, '%')) " +
           "OR LOWER(a.department) LIKE LOWER(CONCAT('%', :search, '%')))")
    List<Asset> searchAssets(@Param("status") AssetStatus status, @Param("search") String search);
}
