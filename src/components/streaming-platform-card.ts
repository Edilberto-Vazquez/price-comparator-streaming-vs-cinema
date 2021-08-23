interface Properties {
  id: string;
  img: string;
  platformprice: number;
  cinemaprice: number;
}

class StreamingPlatformCard extends HTMLElement {
  protected _properties: Properties;
  protected _observer: MutationObserver;

  constructor(properties: Properties) {
    super();
    this.attachShadow({ mode: "open" });
    this._properties = properties;
    this._observer = new MutationObserver((mutations) =>
      this.onDomChanged(mutations)
    );
  }

  public get properties(): Properties {
    return this._properties;
  }

  public set properties(value: Properties) {
    this._properties = value;
  }

  protected getSyles(): string {
    return `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        :host {
          width: 100%;
          max-width: 700px;
          height: auto;
          display: grid;
          animation: fade 0.4s linear;
        }
        .streaming-platform-card {
          width: 100%;
          height: auto;
          padding: 24px 24px;
          display: grid;
          grid-auto-rows: 1fr;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 14px;
          border-radius: 10px;
          background: #0f171e;
        }
        .streaming-platform-card__image {
          width: 100%;
          height: 100px;
        }
        .streaming-platform-card__description {
          display: grid;
          row-gap: 14px;
          font-size: 1.8rem;
          color: white;
        }
        @keyframes fade {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0)
          }
        }
      <style>
    `;
  }

  protected getTemplate(): HTMLTemplateElement {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = `
      <article class="streaming-platform-card">
        <img
          src=${this.properties.img}
          alt="streaming platform"
          class="streaming-platform-card__image">
        <div class="streaming-platform-card__description">
          <span>Costo mensual de la suscripción: ${
            this.properties.platformprice
          } </span>
          <span>Costo mensual del cine: ${this.properties.cinemaprice} </span>
          <span>${this.priceComparator(
            this.properties.platformprice,
            this.properties.cinemaprice
          )}
        </div>
        </span>
      </article>
      ${this.getSyles()}
    `;
    return template;
  }

  protected priceComparator(
    platformprice: number,
    cinemaprice: number
  ): string {
    if (platformprice > cinemaprice) {
      return "Es más barato ir al cine";
    } else if (platformprice < cinemaprice) {
      return "Es más barato pagar la suscripción";
    } else {
      return "valen lo mismo";
    }
  }

  protected render(): void {
    this.setAttribute("id", this.properties.id);
    this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
  }

  protected onDomChanged(mutations: MutationRecord[]): void {
    if (!this.shadowRoot) {
      return;
    }
  }

  public connectedCallback(): void {
    this._observer.observe(this, {
      attributes: true,
      characterData: true,
      subtree: true,
      childList: true,
    });
    this.render();
  }

  static get observedAttributes(): string[] {
    return ["properties"];
  }

  public attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any
  ): void {
    if (name === "properties") {
      this.properties = newValue;
    }
  }

  public disconnectedCallback(): void {
    this._observer.disconnect();
  }
}

customElements.define("streaming-platform-card", StreamingPlatformCard);

export default StreamingPlatformCard;
