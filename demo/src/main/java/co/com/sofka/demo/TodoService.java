package co.com.sofka.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){
        return repository.findAll();
    }

    public Todo save(Todo todo){
        return repository.save(todo);
    }

    public Todo get(Long id) throws Exception {
        return repository.findById(id).orElseThrow(() -> new Exception("No se encontro con la id - " + id));
    }

    public void delete(Long id) throws Exception {
        repository.delete(get(id));
    }
}
