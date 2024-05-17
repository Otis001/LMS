document.addEventListener('DOMContentLoaded', () => {
    // Existing code...

    if (window.location.pathname === '/dashboard') {
        fetchFullName();
        fetchCourses();
        fetchSelectedCourses();

        const courseSelectionForm = document.getElementById('course-selection-form');
        courseSelectionForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const selectedCourseId = document.getElementById('courses-select').value;
            try {
                const response = await fetch('/select-course', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ courseId: selectedCourseId })
                });
                if (response.ok) {
                    alert('Course added successfully');
                    fetchSelectedCourses();
                } else {
                    alert('Failed to add course');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }
});

function fetchCourses() {
    fetch('/courses')
        .then(response => response.json())
        .then(courses => {
            const coursesSelect = document.getElementById('courses-select');
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = course.name;
                coursesSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching courses:', error);
        });
}

function fetchSelectedCourses() {
    fetch('/selected-courses')
        .then(response => response.json())
        .then(courses => {
            const coursesList = document.getElementById('courses-list');
            coursesList.innerHTML = '';
            courses.forEach(course => {
                const li = document.createElement('li');
                li.textContent = course.name;
                coursesList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching selected courses:', error);
        });
}
