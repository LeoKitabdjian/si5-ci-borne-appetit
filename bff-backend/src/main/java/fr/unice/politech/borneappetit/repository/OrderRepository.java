package fr.unice.politech.borneappetit.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import fr.unice.politech.borneappetit.model.TableOrder;

@RepositoryRestResource(exported = false)
public interface OrderRepository extends MongoRepository<TableOrder, String> {
}

