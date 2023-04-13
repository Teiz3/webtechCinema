SELECT Movies.movieid, title, image, scheduleid, date, weekday, time
FROM Movies INNER JOIN Schedule ON Schedule.movieid = Movies.movieid
WHERE Movies.movieid = 4;

SELECT Movies.movieid, title, image
FROM Movies
WHERE Movies.movieid = 4;

SELECT scheduleid, date, weekday, time
FROM Schedule
WHERE schedule.movieid = 4;