
  with personality_list(personality_id, sort_order) as (
    values
      ('salmon-nigiri', 1),
      ('spicy-tuna', 2),
      ('avocado-maki', 3),
      ('california-roll', 4),
      ('unagi', 5),
      ('tamago', 6),
      ('shrimp-tempura', 7),
      ('katsu-curry', 8),
      ('takoyaki', 9),
      ('wasabi', 10),
      ('matcha-latte', 11),
      ('matcha-tiramisu', 12),
      ('mochi', 13),
      ('dorayaki', 14),
      ('plain-white-rice', 15),
      ('ramen', 16),
      ('spicy-salmon', 17),
      ('bicep-sushi', 18),
      ('dynamite-roll', 19),
      ('extra-spicy-curry', 20),
      ('karaage', 21),
      ('pickled-ginger', 22)
  ),
  totals as (
    select count(*) as total
    from public.quiz_results
  )
  select
    p.personality_id,
    count(q.id)::bigint as result_count,
    totals.total::bigint as total_quizzes
  from personality_list p
  cross join totals
  left join public.quiz_results q
    on q.personality_id = p.personality_id
  group by p.personality_id, p.sort_order, totals.total
  order by p.sort_order;
