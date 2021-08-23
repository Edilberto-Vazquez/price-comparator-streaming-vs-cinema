interface Properties {
  id: string;
  img: string;
  plans: { plan: string; price: number }[];
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
          max-width: 450px;
          height: 380px;
          display: grid;
          animation: fade 0.4s linear;
        }
        .streaming-platform-card {
          width: 100%;
          height: 100%;
          padding: 24px 24px;
          display: grid;
          grid-auto-rows: min-content;
          place-items: center;
          gap: 14px;
          border-radius: 10px;
          background: #040714;
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
        <img src=${
          this.properties.img
        } alt="streaming platform" class="streaming-platform-card__image" />
        <div class="streaming-platform-card__description">
        <span>Costo mensual del cine: ${this.formatPrice(
          this.properties.cinemaprice
        )} </span>
          ${this.priceComparator(this.properties.plans)}
        </div>
        </span>
      </article>
      ${this.getSyles()}
    `;
    return template;
  }

  protected priceComparator(plans: any): any {
    const plansList = plans
      .map((plan: any) => {
        const annualPriceCiname: number = this.properties.cinemaprice * 12;
        if (plan.plan === "Anual") {
          return `<span>Plan ${plan.plan}: ${this.formatPrice(
            plan.price
          )} ${this.saveMoney(plan.price, annualPriceCiname)}</span>`;
        } else if (plan.plan !== "Anual") {
          return `<span>Plan ${plan.plan}: ${this.formatPrice(
            plan.price
          )} ${this.saveMoney(plan.price, this.properties.cinemaprice)}</span>`;
        }
      })
      .join("");
    return plansList;
  }

  protected saveMoney(planPrice: number, cinemaPrice: number) {
    return planPrice < cinemaPrice
      ? `ahorras: ${this.formatPrice(Math.abs(planPrice - cinemaPrice))}`
      : `pierdes: ${this.formatPrice(Math.abs(planPrice - cinemaPrice))}`;
  }

  protected formatPrice(price: number): string {
    const newPice = new window.Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: "MXN",
    }).format(price);

    return newPice;
  }

  protected render(): void {
    this.setAttribute("id", this.properties.id);
    this.shadowRoot?.appendChild(this.getTemplate().content.cloneNode(true));
  }

  protected onDomChanged(mutations: MutationRecord[]): void {
    if (mutations) {
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
    while (this.shadowRoot?.firstChild) {
      this.shadowRoot?.removeChild(this.shadowRoot?.firstChild);
    }
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
