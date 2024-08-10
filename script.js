document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    var modalButtons = document.querySelectorAll('.modal-button');
    var closeButtons = document.querySelectorAll('.close');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });

    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            var modalId = button.getAttribute('data-modal');
            var modal = document.getElementById('modal-' + modalId);
            modal.style.display = 'flex'; 
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            button.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });


    // Toggle dark theme
    document.getElementById('darkTheme').addEventListener('change', function() {
        var body = document.querySelector('body');
        body.classList.toggle('dark-theme');
        updateRgbSliderVisibility();
    });

    // Toggle rainbow theme
    document.getElementById('rainbow-theme-toggle').addEventListener('change', function() {
        if (!document.querySelector('body').classList.contains('dark-theme')) {
            var isChecked = this.checked;
            document.getElementById('rgb-slider').style.display = isChecked ? 'block' : 'none';
            if (!isChecked) {
                resetCustomColors();
                document.querySelector('body').classList.remove('custom-theme');
            } else {
                document.querySelector('body').classList.add('custom-theme');
            }
        }
    });
    

    // RGB sliders
    var redSlider = document.getElementById('red-slider');
    var greenSlider = document.getElementById('green-slider');
    var blueSlider = document.getElementById('blue-slider');

    redSlider.addEventListener('input', updateCustomColors);
    greenSlider.addEventListener('input', updateCustomColors);
    blueSlider.addEventListener('input', updateCustomColors);

    function updateRgbSliderVisibility() {
        var isDarkTheme = document.querySelector('body').classList.contains('dark-theme');
        var rainbowToggle = document.getElementById('rainbow-theme-toggle');
        if (isDarkTheme) {
            rainbowToggle.checked = false;
            document.getElementById('rgb-slider').style.display = 'none';
            resetCustomColors();
        }
    }

    function updateCustomColors() {
        if (!document.querySelector('body').classList.contains('dark-theme')) {
            var r = redSlider.value;
            var g = greenSlider.value;
            var b = blueSlider.value;
            var rgbColor = `rgb(${r}, ${g}, ${b})`;
            applyCustomColors(rgbColor);
        }
    }

    function applyCustomColors(color) {
        document.documentElement.style.setProperty('--custom-bg-color', color);
        document.documentElement.style.setProperty('--custom-text-color', '#fff'); 
    }

    function resetCustomColors() {
        document.documentElement.style.setProperty('--custom-bg-color', '');
        document.documentElement.style.setProperty('--custom-text-color', '');
    }
});




var currentContact = null;

function selectContact(contact) {
    var contacts = document.querySelectorAll('.contact');
    contacts.forEach(function (item) {
        item.classList.remove('selected-contact');
    });

    contact.classList.add('selected-contact');
    var contactName = contact.querySelector('.contact-name-hidden').value;
    currentContact = contactName;

    var messageList = document.getElementById('messageList');
    messageList.innerHTML = "";
    setupChatResponse(contactName);
}

function sendMessage() {
    if (!currentContact) return;

    var messageInput = document.getElementById('messageInput');
    var messageText = messageInput.value;
    if (messageText.trim() === '') return;

    var messageList = document.getElementById('messageList');
    var messageItem = document.createElement('div');
    messageItem.classList.add('message');

    var userAvatarImg = document.createElement('img');
    userAvatarImg.src = "avatar0.jpg";
    userAvatarImg.alt = "Your Avatar";
    userAvatarImg.classList.add('avatar');
    messageItem.appendChild(userAvatarImg);

    var userNameSpan = document.createElement('span');
    userNameSpan.classList.add('user-name');
    userNameSpan.textContent = 'ВЫ:';
    messageItem.appendChild(userNameSpan);

    var messageTextSpan = document.createElement('span');
    messageTextSpan.textContent = " " + messageText;
    messageItem.appendChild(messageTextSpan);

    messageList.appendChild(messageItem);

    messageInput.value = '';

    
    messageList.scrollTop = messageList.scrollHeight;

    setTimeout(function () {
        var contactResponse = generateContactResponse(currentContact, messageText);
        var responseItem = document.createElement('div');
        responseItem.classList.add('message');

        var contactAvatarImg = document.createElement('img');
        contactAvatarImg.src = getContactAvatar(currentContact);
        contactAvatarImg.alt = currentContact + " Avatar";
        contactAvatarImg.classList.add('avatar');
        responseItem.appendChild(contactAvatarImg);

        var contactNameSpan = document.createElement('span');
        contactNameSpan.classList.add('user-name');
        contactNameSpan.textContent = currentContact + ":";
        responseItem.appendChild(contactNameSpan);

        var responseTextSpan = document.createElement('span');
        responseTextSpan.textContent = " " + contactResponse;
        responseItem.appendChild(responseTextSpan);

        messageList.appendChild(responseItem);
        
        messageList.scrollTop = messageList.scrollHeight;
    }, 1000);
}

var responses = {
    "Ещкериец": {
        "привет": "Пасхалко!",
        "как дела?": "Ещкере!",
        "ты в тик токе": "yeahh of corce",
        "ты плохой англичанин": "ТЫ хочешь в медный бык?",
        "1488": "Пасхалко!",
        "спой гимн Ещкерии": "Ещкерияяя, страна великкаааяя!",
        "что нового?": "Нового ничего, кроме поиска новых пасхалок и обновления вентиляторов.",
        "как настроение?": "Настроение как всегда на 1488%! Ещкерия в сердце!",
        "чем занят?": "Придумываю новые шутки про вентиляторы и провожу время, избегая Анонимусов.",
        "какие планы на сегодня?": "Планирую найти еще одну пасхалку и обсудить, как бороться с Анти Ещкерийцами.",
        "что думаешь о текущих событиях?": "Думаю, что мир стал бы лучше, если бы все признали величие Ещкерии и избавились от Анонимусов.",
        "какой твой любимый мем?": "Все, что связано с Ещкерией и вентиляторами!",
        "какой у тебя девиз?": "Живи весело, шути много, будь Ещкерийцем!",
        "что тебе нравится в Ещкерии?": "Все! Особенно наше чувство юмора и любовь к пасхалкам.",
        "как бороться с Анти Ещкерийцами?": "Игнорировать их и наслаждаться жизнью!",
        "пока": "не познал ты пасхалку..."
    },
    "Тулер Дерден": {
        "привет": "Здравствуй! Чем могу помочь?",
        "как дела?": "Отлично, спасибо за спрос!",
        "что нового?": "Нового ничего, кроме очередного плана по захвату мира.",
        "как настроение?": "Боевой дух на высоте, как всегда!",
        "чем занят?": "Составляю список вещей, которые нужно взорвать.",
        "какие планы на сегодня?": "Сегодня в планах: кофе, анархия и немного хаоса.",
        "что думаешь о текущих событиях?": "Мир слишком упорядочен, нужно больше анархии.",
        "какой твой любимый фильм?": "Конечно, 'Бойцовский клуб'! А у тебя?",
        "какой у тебя девиз?": "Правила созданы, чтобы их нарушать.",
        "какие книги читаешь?": "Люблю философию и анархию, например, 'Богатство наций'.",
        "чем удивишь?": "Могу показать тебе мир с другой стороны."

    },
    "Василий": {
        "привет": "я отдыхаю...",
        "как дела?": "Пью чай, у тебя?",
        "хорошо": "ну вот и отлично",
        "Василий что мне делать чтоб дописать этот мессенджер чтоб общаться с тобой": "тебе трудиться, а мне лениться",
         "что нового?": "Нового ничего, кроме новой подушки для сна.",
        "как настроение?": "Настроение ленивое, как и должно быть у кота.",
        "чем занят?": "Лежу, ем и снова лежу. Жизнь в кайф!",
         "какие планы на сегодня?": "Планирую поспать, поесть, а потом еще поспать.",
         "что думаешь о текущих событиях?": "Думаю, что пока есть еда и уютное место для сна, всё остальное не важно.",
         "какой твой любимый корм?": "Тунец, без сомнений!",
        "что ты любишь делать больше всего?": "Спать и есть, в таком порядке.",
        "какая твоя любимая игрушка?": "Мышка на веревочке, обожаю гоняться за ней.",
        "что тебя раздражает?": "Когда меня будят посреди сна.",
        "пока": "До завтра!"
    },
    "PHP БОГ": {
        "привет": "здравствуй",
        "как дела?": "пишу на шедевро PHP",
        "доделай мне этот мессенджер на волшебном PHP": "нет, я в секунду 10 таких делаю",
        "что нового?": "Нового? Как всегда, пишу магию кода и создаю миры!",
        "как настроение?": "Настроение как у идеально работающего скрипта!",
        "чем занят?": "Смотрю на исходники Вселенной и ищу баги в матрице.",
        "какие планы на сегодня?": "Запустить новый проект и исправить баги.",
        "что думаешь о текущих событиях?": "Думаю, что всем не помешало бы немного оптимизации в их жизни." ,
        "какой твой любимый язык программирования?": "PHP, конечно! Но и другие уважаю.",
        "что самое сложное в программировании?": "Борьба с багами, которые появляются ниоткуда.",
        "какой у тебя девиз?": "Кодить до совершенства!",
        "чем гордишься?": "Созданием стабильных и быстрых приложений.",
        "как решаешь проблемы с кодом?": "Методично и с чашкой крепкого кофе."     
    },
    "Тони Старк": {
        "привет": "Здравствуйте! Чем могу помочь?",
        "как дела?": "Как всегда, на высоте. Жизнь миллиардерская.",
        "что нового?": "Нового? Я только что изобрел новый элемент для реактора. А у тебя?",
        "как настроение?": "Настроение как у миллиардера, плейбоя и филантропа!",
        "чем занят?": "Разрабатываю новый костюм. Что-то с лазерами и ракетами.",
        "какие планы на сегодня?": "Спасу мир, а потом, возможно, схожу на ужин.",
        "что думаешь о текущих событиях?": "Думаю, что немного Stark Tech не помешало бы для решения всех проблем.",
        "какое твоя любимая изобретение?": "Определенно мой костюм Железного Человека.",
        "какой у тебя девиз?": "Сделать мир лучше через инновации.",
        "что вдохновляет?": "Мир и все его возможности для улучшения.",
        "чем занимаешься в свободное время?": "Тестирую новые гаджеты и технологии.",
        "что думаешь о будущем?": "Оно будет блестящим, если мы будем продолжать инновации.",
        "пока": "Увидимся, но не прощаемся! Мир сам себя не спасет."
    }
};

function generateContactResponse(contactName, userInput) {
    let response;
    if (responses.hasOwnProperty(contactName) && responses[contactName].hasOwnProperty(userInput)) {
        response = responses[contactName][userInput];
    } else {
        response = "Прости, не могу ответить сейчас.";
    }
    return response;
}

function getContactAvatar(contactName) {
    var contactElements = document.querySelectorAll('.contact');
    for (var i = 0; i < contactElements.length; i++) {
        var nameHidden = contactElements[i].querySelector('.contact-name-hidden').value;
        if (nameHidden === contactName) {
            return contactElements[i].querySelector('img').src;
        }
    }
    return '';
}

function setupChatResponse(contactName) {
    document.getElementById('messageInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    document.getElementById('sendMessageButton').addEventListener('click', function () {
        sendMessage();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    var firstContact = document.querySelector('.contact');
    if (firstContact) {
        selectContact(firstContact);
    }
});
