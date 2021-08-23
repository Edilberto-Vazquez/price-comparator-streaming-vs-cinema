class StreamingPlatformButton extends HTMLElement {
  protected _name: string;
  protected _image: string;
  protected _display: boolean;
  protected handleClick: (event: any) => any;
  protected _observer: MutationObserver;

  constructor(
    name: string,
    image: string,
    display: boolean,
    handleClick: (event: any) => any
  ) {
    super();
    this.attachShadow({ mode: "open" });
    this._name = name;
    this._image = image;
    this._display = display;
    this.handleClick = handleClick.bind(this);
    this._observer = new MutationObserver(
      (mutations: MutationRecord[]) => this.onDomChanged
    );
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get image(): string {
    return this._image;
  }

  public set image(value: string) {
    this._image = value;
  }

  public get display(): boolean {
    return this._display;
  }

  public set display(value: boolean) {
    this._display = value;
  }

  protected getStyles(): string {
    return `
      <style>
        :host {
          width: 50px;
          height: 50px;
          display: grid;
        }
      </style>
    `;
  }

  protected getTemplete(): HTMLTemplateElement {
    const templete = document.createElement("template");
    templete.innerHTML = `
      <div>
        <img src=${this.image} alt=${this.name}>
      </div>
      ${this.getStyles()}
    `;
    return templete;
  }

  protected render() {
    this.addEventListener("click", this.handleClick);
    this.shadowRoot?.append(this.getTemplete().content.cloneNode(true));
  }

  protected onDomChanged(mutations: MutationRecord[]): void {
    if (!this) {
      return;
    }
  }

  public connectedCallback(): void {
    this.render();
  }

  static get observedAttributes(): string[] {
    return ["name", "image", "display"];
  }

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any
  ): void {
    if (name === "name") {
      this.name = newValue;
    }
    if (name === "image") {
      this.image = newValue;
    }
    if (name === "display") {
      this.display = newValue;
    }
  }

  public disconnectedCallback(): void {
    this._observer.disconnect;
    this.removeEventListener("click", this.handleClick);
  }
}

customElements.define("streaming-platform-button", StreamingPlatformButton);

export default StreamingPlatformButton;
