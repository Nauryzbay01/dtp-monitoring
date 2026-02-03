import { Tag, Divider } from "antd";
import type { AccidentPoint } from "../../../shared/types";
import { formatDateTime } from "../../../shared/helpers";

type AccidentPopupProps = {
  accident: AccidentPoint;
};

export const AccidentPopup = ({ accident }: AccidentPopupProps) => {
  const props = accident.properties;

  return (
    <div className="p-3 max-w-md">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          ДТП #{accident.id}
        </h3>
        {props.fd1r01p1 && (
          <div className="text-xs text-gray-600">
            Номер карточки: {props.fd1r01p1}
          </div>
        )}
      </div>

      <Divider className="my-2" />

      <div className="space-y-2 text-sm">
        <div className="flex">
          <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
            Вид ДТП:
          </span>
          <span className="text-gray-900">{props.fd1r17 || "—"}</span>
        </div>

        <div className="flex">
          <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
            Виновный:
          </span>
          <span className="text-gray-900">{props.fd1r14p1 || "—"}</span>
        </div>

        {props.fd1r05p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Время суток совершения ДТП:
            </span>
            <span className="text-gray-900">{props.fd1r05p1}</span>
          </div>
        )}

        {props.yr && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Год:
            </span>
            <span className="text-gray-900">{props.yr}</span>
          </div>
        )}

        {props.load_date && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Дата загрузки в ГИС:
            </span>
            <span className="text-gray-900">
              {formatDateTime(props.load_date)}
            </span>
          </div>
        )}

        {props.rta_date && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Дата совершения ДТП:
            </span>
            <span className="text-gray-900">
              {formatDateTime(props.rta_date)}
            </span>
          </div>
        )}

        {props.is_public_transport !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Общественный транспорт:
            </span>
            <Tag color={props.is_public_transport === 1 ? "red" : "green"}>
              {props.is_public_transport === 1 ? "Да" : "Нет"}
            </Tag>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {props.fd1r071p1_id && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Зафиксированные недостатки:
            </span>
            <span className="text-gray-900">{props.fd1r071p1_id}</span>
          </div>
        )}

        {props.fd1r071p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Недостатки УДС:
            </span>
            <span className="text-gray-900">{props.fd1r071p1}</span>
          </div>
        )}

        {props.fdlid && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Идентификатор записи:
            </span>
            <span className="text-gray-900 text-xs break-all">
              {props.fdlid}
            </span>
          </div>
        )}

        {props.vehicle_category && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Категория транспорта:
            </span>
            <Tag color="blue">{props.vehicle_category}</Tag>
          </div>
        )}
      </div>

      <div className="space-y-2 text-sm">
        {props.area_code && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Код региона:
            </span>
            <span className="text-gray-900">{props.area_code}</span>
          </div>
        )}

        {props.fd1r13p1 !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Кол-во ТС:
            </span>
            <span className="text-gray-900">{props.fd1r13p1}</span>
          </div>
        )}

        {props.fd1r74p1 !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Количество погибших:
            </span>
            <span className="text-red-600 font-semibold">
              {props.fd1r74p1 || "—"}
            </span>
          </div>
        )}

        {props.fd1r73p1 !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Количество раненых:
            </span>
            <span className="text-orange-600 font-semibold">
              {props.fd1r73p1 || "—"}
            </span>
          </div>
        )}
      </div>

      <Divider className="my-2" />

      <div className="space-y-2 text-sm">
        {props.fd1r06p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Место совершения ДТП:
            </span>
            <span className="text-gray-900">{props.fd1r06p1}</span>
          </div>
        )}

        {props.fd1r06p2 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Район совершения ДТП:
            </span>
            <span className="text-gray-900">{props.fd1r06p2}</span>
          </div>
        )}

        {props.period !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Месяц:
            </span>
            <span className="text-gray-900">{props.period}</span>
          </div>
        )}
      </div>

      <Divider className="my-2" />

      <div className="space-y-2 text-sm">
        {props.fd1r07p3 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Наружное освещение:
            </span>
            <span className="text-gray-900">{props.fd1r07p3}</span>
          </div>
        )}

        {props.fd1r09p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Нарушение ПДД:
            </span>
            <span className="text-gray-900">{props.fd1r09p1}</span>
          </div>
        )}

        {props.fd1r07p2 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Освещенность:
            </span>
            <span className="text-gray-900">{props.fd1r07p2}</span>
          </div>
        )}

        {props.fd1r07p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Погодные условия:
            </span>
            <span className="text-gray-900">{props.fd1r07p1}</span>
          </div>
        )}

        {props.fd1r08p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Состояние дорожного покрытия:
            </span>
            <span className="text-gray-900">{props.fd1r08p1}</span>
          </div>
        )}
      </div>

      <Divider className="my-2" />

      <div className="space-y-2 text-sm">
        {props.fd1r141p1 && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Состояние виновного:
            </span>
            <Tag color={props.fd1r141p1 === "трезвый" ? "green" : "red"}>
              {props.fd1r141p1}
            </Tag>
          </div>
        )}

        {props.fd1r10p1 !== undefined && (
          <div className="flex">
            <span className="font-semibold text-gray-700 w-[180px] flex-shrink-0 mr-2">
              Количество участников:
            </span>
            <span className="text-gray-900">{props.fd1r10p1}</span>
          </div>
        )}
      </div>

      {props.fd1r17_descrip && (
        <>
          <Divider className="my-2" />
          <div className="text-sm">
            <span className="font-semibold text-gray-700 block mb-1">
              Описание:
            </span>
            <p className="text-gray-900 text-xs leading-relaxed">
              {props.fd1r17_descrip}
            </p>
          </div>
        </>
      )}

      <Divider className="my-2" />

      <div className="text-xs text-gray-500">
        <div>
          Координаты: {accident.coordinates[1].toFixed(6)},{" "}
          {accident.coordinates[0].toFixed(6)}
        </div>
        {props.globalid && (
          <div className="break-all">Global ID: {props.globalid}</div>
        )}
      </div>
    </div>
  );
};
