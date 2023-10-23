package fr.unice.politech.borneappetit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import fr.unice.politech.borneappetit.model.TableOrderPostgre;

@Repository
public interface OrderRepository extends JpaRepository<TableOrderPostgre, Long> {
}


