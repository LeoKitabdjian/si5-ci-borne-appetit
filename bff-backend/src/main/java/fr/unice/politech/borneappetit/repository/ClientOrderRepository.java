package fr.unice.politech.borneappetit.repository;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientOrderRepository extends JpaRepository<ClientOrderEntity, Long> {
    @Query("SELECT co FROM client_orders co WHERE co.tableId = :tableId AND co.clientId = :clientId AND co.ordered = false")
    Optional<ClientOrderEntity> findNotOrderedByTableIdAndClientId(@Param("tableId") Long tableId, @Param("clientId") Long clientId);

    @Query("SELECT co FROM client_orders co WHERE co.tableId = :tableId AND co.ordered = false")
    List<ClientOrderEntity> findNotOrderedOrdersForTable(@Param("tableId") Long tableId);

    @Query("SELECT co FROM client_orders co WHERE co.tableId = :tableId AND co.ordered = true AND co.billed = false")
    List<ClientOrderEntity> findNotBilledOrdersForTable(@Param("tableId") Long tableId);
}
