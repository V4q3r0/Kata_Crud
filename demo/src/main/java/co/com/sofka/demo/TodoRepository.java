package co.com.sofka.demo;

import org.springframework.data.repository.CrudRepository;

//Interface para usar las funciones de CrudRepository
public interface TodoRepository extends CrudRepository<Todo, Long> {
}
