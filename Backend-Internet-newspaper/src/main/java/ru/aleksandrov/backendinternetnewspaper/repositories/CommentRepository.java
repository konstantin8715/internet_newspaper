package ru.aleksandrov.backendinternetnewspaper.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.aleksandrov.backendinternetnewspaper.models.Comment;
import ru.aleksandrov.backendinternetnewspaper.models.News;


import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    @Transactional
    List<Comment> findAll();

    @Transactional
    List<Comment> findByNews(News news);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM comment c WHERE c.id = :commentId AND c.author_id = :userId", nativeQuery = true)
    void deleteCommentByUserIdAndCommentId(@Param("userId") Integer userId, @Param("commentId") Integer commentId);

    @Transactional
    @Query(value = "SELECT c FROM comment c WHERE c.news.id = :newsId")
    Slice<Comment> findThreeComments(@Param("newsId") Integer newsId, Pageable pageable);

    Integer countByNewsId(Integer newsId);
}
