import { Context } from "koa";
import { Connection } from "typeorm";

/**
 * 
 */
export class BaseView {
    public $model = null;
    public $methods = null;
    public $filterKeys = null;
    private $connection: Connection = null;

    constructor(connection: Connection) {
        this.$connection = connection;
        this.dispatchRequest = this.dispatchRequest.bind(this);
    }

    public async get(context: Context): Promise<void> {
        context.body = "get"
    }

    public async post(context: Context): Promise<void> {

    }

    public async delete(context: Context): Promise<void> {

    }

    public async put(context: Context): Promise<void> {

    }

    public async patch(context: Context): Promise<void> {

    }

    public async dispatchRequest(context: Context, next): Promise<void> {
        const method = context.params.method;
        const fun: (ctx: Context) => Promise<void> = this[method];
        if(fun != null) {
            return await fun(context);
        }
        context.body = {
            "status": 404,
            "message": "404",
        };
        context.status = 404;
    }
}
