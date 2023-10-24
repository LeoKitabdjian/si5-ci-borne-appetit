package fr.unice.politech.borneappetit.repository;

import fr.unice.politech.borneappetit.model.ClientOrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientOrderRepository extends JpaRepository<ClientOrderEntity, Long> {
}
