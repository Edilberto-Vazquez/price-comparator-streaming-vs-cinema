class MoviesForm extends HTMLFormElement {
  constructor() {
    super();
  }

  protected getStyles(): string {
    return `
      <style>
      .movies-form {
      }
      </style>
    `;
  }

  protected getTemplate(): HTMLTemplateElement {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = `
        <label for="numMovies">
          Películas que ves al mes
          <input type="number" name="numMovies" id="numMovies">
        </label>
        <label for="moviePrice">
          Precio de la película
          <input type="number" name="moviePrice" id="moviePrice">
        </label>
      ${this.getStyles()}
    `;
    return template;
  }

  protected render(): void {
    this.classList.add("movies-form");
    this.append(this.getTemplate().content.cloneNode(true));
  }

  public connectedCallback(): void {
    this.render();
  }
}

customElements.define("movies-form", MoviesForm, { extends: "form" });

export default MoviesForm;
