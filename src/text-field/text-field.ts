export class TextField {
  private text_ = "";
  private textElement: HTMLParagraphElement;

  constructor(parentHtmlElement: HTMLElement, width: number) {
    const div = document.createElement("div");
    parentHtmlElement.appendChild(div);
    this.textElement = document.createElement("p");
    this.textElement.style.fontWeight = "700";
    div.style.minHeight = "50px";
    div.appendChild(this.textElement);
    div.style.width = width + "px";
  }

  set text(text: string) {
    this.textElement.innerText = text;
  }

  set color(color: string) {
    this.textElement.style.color = color;
  }
}
