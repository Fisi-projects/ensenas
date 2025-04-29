Yo como usuario...
- Registrarme
- Loggearme
- Tomar un examen diagnóstico (opcional).
- Leer/Escuchar el contenido de las lecciones.
- Seleccionar un capitulo
- Realizar una lecccion
- Ver informacion de la cuenta
- Cambiar ajustes de apariencia
- Tomar examen para avanzar/saltar capitulo
- ver nivel actual
- ganar experiencia luego de una leccion
- desbloquear insignias segun el numero de lecciones realizadas
- Recibir recordatorios de realizar leccion

# Data model

### user
- mail
- hashed_pwd
- level
- streak
- badges

### signs
- word
- image_url

### chapter
- base_level
- title
- description
- difficulty_level
- unlocked // bool. if (user.level>=chapter.base_level) -> chapter.level == true
- state (locked, available, completed)

### lesson
- title
- content

### quiz
- statement
- type
- minimum_score (numero de preguntas)

### quiz_question
Cada pregunta dentro de un quiz.
- quiz_id (FK a quiz.id)
- sign_id (FK a sign.id) → Para mostrar la imagen de la seña
- expected_answer (texto correcto que el usuario debe tipear)
- question_type (input_text, multiple_choice, true_false, etc.)
- points (valor de la pregunta)

### user_quiz_answer
Guarda la respuesta de un usuario a una pregunta específica.
- question_id (FK a quiz_question.id)
- answer_given
- is_correct (bool)

**Flujo típico del quiz:**
1. El usuario entra a un capítulo.
2. Desbloquea el quiz relacionado (quiz.chapter_id).
3. El sistema le muestra una pregunta (quiz_question) → se carga imagen desde sign.image_url.
4. Usuario responde → se guarda en user_quiz_answer.
5. Al terminar, se crea un user_quiz_attempt con el score total.


# Consideraciones extra
- hybrid database models
- relational -> user, signs
- non-relational -> chapters, lessons



*to do: cuenta, traducción, diccionario*
