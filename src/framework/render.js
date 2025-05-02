import { AbstractComponent } from "./view/abstact-component.js";

export const RenderPosition = {
    BEFOREBEGIN: 'beforebegin',
    AFTERBEGIN: 'afterbegin',
    BEFOREEND: 'beforeend',
    AFTEREND: 'afterend',
};

export function createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
}

export function render(component, container, place = RenderPosition.BEFOREEND) {
    if (!(component instanceof AbstractComponent)) {
        throw new Error('Can render only components');
    }

    if (container === null) {
        throw new Error('Container element doesn\'t exist');
    }

    container.insertAdjacentElement(place, component.element);
}

export function replace(newComponent, oldComponent) {
    if (!(newComponent instanceof AbstractComponent && oldComponent instanceof AbstractComponent)) {
        throw new Error('Can replace only components');
    }

    const newElement = newComponent.element;
    const oldElement = oldComponent.element;

    const parent = oldElement.parentElement;

    if (parent === null) {
        throw new Error('Parent element doesn\'t exist');
    }

    parent.replaceChild(newElement, oldElement);
}

export function remove(component) {
    if (!(component instanceof AbstractComponent)) {
        throw new Error('Can remove only components');
    }

    if (component.element === null) {
        return;
    }

    component.element.remove();
    component.removeElement();
}