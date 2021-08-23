class MoviesForm extends HTMLFormElement {
  constructor() {
    super();
  }

  protected getStyles(): string {
    return `
      <style>
        .movies-form {
          width: 300px;
          height: 110px;
          display: grid;
          row-gap: 5px;
        }
        .movies-form__label {
          width: 100%;
          height: 50px;
          border-radius: 10px;
        }
        .movies-form__input {
          width: 100%;
          height: 50px;
          display: grid;
          padding-left: 20px;
          border: none;
          border-radius: 5px;
          font-size: 1.6rem;
          background: rgb(49, 52, 62);
          color: white;
          caret-color: white;
        }
        .movies-form__input:focus-visible {
          outline: none;
          border: 1px solid rgb(168, 169, 173);
        }
        .movies-form__input::placeholder {
          color: rgb(168, 169, 173);
        }
      </style>
    `;
  }

  protected getTemplate(): HTMLTemplateElement {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = `
        <label class="movies-form__label" for="numMovies">
          <input class="movies-form__input" type="number" name="numMovies" id="numMovies" placeholder="Películas que ves al mes">
        </label>
        <label class="movies-form__label" for="moviePrice">
          <input class="movies-form__input" type="number" name="moviePrice" id="moviePrice" placeholder="Precio de la película">
        </label>
      ${this.getStyles()}
    `;
    return template;
  }

  protected render(): void {
    this.className = "movies-form";
    this.append(this.getTemplate().content.cloneNode(true));
  }

  public connectedCallback(): void {
    this.render();
  }
}

customElements.define("movies-form", MoviesForm, { extends: "form" });

export default MoviesForm;
