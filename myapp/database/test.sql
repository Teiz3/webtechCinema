SELECT weekday, time, Schedule.movieid, title, image 
FROM Schedule 
INNER JOIN Movies
ON Schedule.movieid = Movies.movieid;