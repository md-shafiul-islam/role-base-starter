class EsResponseMessage {
  toogleStatusSuccessfully(label: string): string {

    return `${label}, Successfully :)`;
  }

  toogleStatusFailed(label: string): string {

    return `${label}, Successfully :)`;
  }
  addAlready = (label: string) => {
    return `Already ${label}, :)`;
  };

  addSuccessfully = (label: string) => {
    return `This ${label}, added Successfully :)`;
  };

  addFailed = (label: string) => {
    return `This ${label},added failed !!. Please, try again later`;
  };

  updated = (label: string) => {
    return `${label}, Update Successfully :)`;
  };

  updateFailed = (label: string) => {
    return `This ${label}, Update Failed. Please, try again later`;
  };

  removeSuccessfully = (label: string) => {
    return `This ${label}, Remove Successfully :)`;
  };

  removeFailed = (label: string) => {
    return `This ${label},Remove failed !!. Please, try again later`;
  };

  foundAll = (size = 0, label = "") => {
    return `${size} ${label}, Found${size > 0 ? "'s" : ""} :)`;
  };

  notFoundAll = (label = "") => {
    return `${label}, Not Found`;
  };

  found = (label = "") => {
    return `${label}, Found`;
  };

  notFound = (label = "") => {
    return `${label}, not Found`;
  };
}

export const esResponseMessage = new EsResponseMessage();
