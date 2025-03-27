class ClassComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.today = "ter";
    }

    connectedCallback() {
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('classes.json');
            const classes = await response.json();
            this.render(classes);
        } catch (error) {
            console.error('Erro ao carregar os dados das aulas:', error);
        }
    }

    render(classes) {
        const todayClasses = classes.filter(classItem => classItem.data === this.today);
    
        // Load external CSS file
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = 'css/classes.css';
        this.shadowRoot.appendChild(stylesheet);
    
        // Generate class list in HTML
        this.shadowRoot.innerHTML += `
            <div>
                ${todayClasses.map(classItem => {
            let testAlertStyle = classItem.prova_alert ? '' : 'display: none;';
            
            let gradeColor = '';
            if (classItem.nota < 6) {
                gradeColor = 'red'; // Less than 6
            } else if (classItem.nota >= 6 && classItem.nota < 8) {
                gradeColor = 'orange'; // Between 6 and 8
            } else {
                gradeColor = 'green'; // 8 or more
            }
    
            return `
                        <div class="class-component">
                            <div class="test-label p-label" style="${testAlertStyle}">
                                PROVA: <b>${classItem.prova}</b>
                            </div>
                            <div class="class-title">${classItem.disciplina}</div>
                            <p class="class-info">
                                Local e Horário: <b>${classItem.local} - ${classItem.horario}</b>
                            </p>
                            <div class="labels">
                                <div class="attendance-label p-label">
                                    FALTAS: <b>${classItem.frequencia}</b>
                                </div>
                                <div class="grade-label p-label ${gradeColor}">
                                    NOTA: <b>${classItem.nota}</b>
                                </div>
                            </div>
                        </div>
                    `;
        }).join('')}
            </div>
        `;
    }
    
    

}

customElements.define('class-component', ClassComponent);  