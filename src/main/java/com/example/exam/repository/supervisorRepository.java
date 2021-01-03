package com.example.exam.repository;

import com.example.exam.model.supervisor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface supervisorRepository extends CrudRepository<supervisor, Integer> {
}
